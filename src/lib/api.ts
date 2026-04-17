export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  token?: string;
  isFormData?: boolean;
};

type ApiResponse<T> = {
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
  [key: string]: unknown;
};

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { method = "GET", body, token, isFormData = false } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body
      ? isFormData
        ? (body as FormData)
        : JSON.stringify(body)
      : undefined,
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => ({}))) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(payload.error || payload.message || "Request failed");
  }

  return payload;
}

export type EventItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  rules?: string;
  eligibility?: string;
  prize_details?: string;
  date: string;
  time: string;
  venue: string;
  max_participants: number;
  registration_fee: number;
  image_url?: string;
};

export type UserRole = "participant" | "organizer" | "volunteer" | "faculty" | "admin";

export type UserInput = {
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  password: string;
  role: UserRole;
  id_card_url?: string;
};

export type QueryInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

export type AdminStats = {
  totalUsers: number;
  totalEvents: number;
  totalRegistrations: number;
  totalQueries: number;
  newQueries: number;
};

export type RecentDashboardData = {
  users: Array<{ id: number; name: string; email: string; created_at: string }>;
  registrations: Array<{
    id: number;
    name: string;
    title: string;
    registration_date: string;
  }>;
  queries: Array<{ id: number; name: string; subject: string; status: string }>;
};

export type RegistrationRow = {
  id: number;
  name: string;
  email: string;
  title: string;
  status: string;
  registration_date: string;
};

export type QueryRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "in-progress" | "resolved";
  admin_response?: string;
  created_at: string;
};

export async function getEvents(params?: {
  category?: string;
  term?: string;
  fromDate?: string;
  toDate?: string;
  sort?: "date_asc" | "date_desc";
}) {
  const query = new URLSearchParams();
  if (params?.category) {
    query.set("category", params.category);
  }
  if (params?.term) {
    query.set("term", params.term);
  }
  if (params?.fromDate) {
    query.set("fromDate", params.fromDate);
  }
  if (params?.toDate) {
    query.set("toDate", params.toDate);
  }
  if (params?.sort) {
    query.set("sort", params.sort);
  }

  const suffix = query.toString() ? `?${query.toString()}` : "";
  const response = await apiRequest<EventItem[]>(`/events${suffix}`);
  return response.data || [];
}

export async function getCategories() {
  const response = await apiRequest<string[]>("/events/list/categories");
  return response.data || [];
}

export async function uploadIdCard(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiRequest<{ fileUrl: string }>("/upload/id-card", {
    method: "POST",
    body: formData,
    isFormData: true,
  });
  return response.data?.fileUrl || "";
}

export async function createUser(payload: UserInput) {
  const response = await apiRequest<{ userId?: number } & Record<string, unknown>>("/users", {
    method: "POST",
    body: payload,
  });
  const userId = Number((response.userId || response.data?.userId || 0) as number);
  return { id: userId };
}

export async function userLogin(email: string, password: string) {
  const response = await apiRequest<{ token: string; user: { role: string; name: string } }>(
    "/auth/login",
    {
      method: "POST",
      body: { email, password },
    },
  );
  return response.data;
}

export async function registerForEvent(user_id: number, event_id: number) {
  const response = await apiRequest<{ registrationId?: number } & Record<string, unknown>>(
    "/reg/user",
    {
      method: "POST",
      body: { user_id, event_id },
    },
  );
  const id = Number((response.registrationId || 0) as number);
  return { id };
}

export async function submitQuery(payload: QueryInput) {
  const response = await apiRequest<{ queryId?: number } & Record<string, unknown>>("/query", {
    method: "POST",
    body: payload,
  });
  const id = Number((response.queryId || 0) as number);
  return { id };
}

export async function getFaq() {
  const response = await apiRequest<FAQItem[]>("/query/faq/all");
  const payload = response.data as unknown;

  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    const maybeFaq = (payload as { faq?: FAQItem[]; data?: FAQItem[]; items?: FAQItem[] }).faq
      || (payload as { faq?: FAQItem[]; data?: FAQItem[]; items?: FAQItem[] }).data
      || (payload as { faq?: FAQItem[]; data?: FAQItem[]; items?: FAQItem[] }).items;

    if (Array.isArray(maybeFaq)) {
      return maybeFaq;
    }
  }

  return [];
}

export async function getQueries(status?: "new" | "in-progress" | "resolved") {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  const response = await apiRequest<QueryRow[]>(`/query/all${query}`);
  return response.data || [];
}

export async function respondToQuery(id: number, admin_response: string) {
  await apiRequest(`/query/${id}/respond`, {
    method: "PUT",
    body: { admin_response },
  });
}

export async function updateQueryStatus(id: number, status: "new" | "in-progress" | "resolved") {
  await apiRequest(`/query/${id}/status`, {
    method: "PUT",
    body: { status },
  });
}

export async function getUserRegistrations(userId: number) {
  const response = await apiRequest<Array<{ id: number; title: string; status: string }>>(
    `/reg/user/${userId}`,
  );
  return response.data || [];
}

export async function adminLogin(username: string, password: string) {
  const response = await apiRequest<{ token: string }>("/admin/login", {
    method: "POST",
    body: { username, password },
  });
  return { token: response.token as string };
}

export async function getAdminStats(token: string) {
  const response = await apiRequest<AdminStats>("/admin/dashboard/stats", { token });
  return response.data as AdminStats;
}

export async function getAdminRecent(token: string) {
  const response = await apiRequest<{
    recentUsers: RecentDashboardData["users"];
    recentRegistrations: RecentDashboardData["registrations"];
    recentQueries: RecentDashboardData["queries"];
  }>("/admin/dashboard/recent", { token });

  return {
    users: response.data?.recentUsers || [],
    registrations: response.data?.recentRegistrations || [],
    queries: response.data?.recentQueries || [],
  } as RecentDashboardData;
}

export async function getAdminRegistrations(token: string) {
  const response = await apiRequest<RegistrationRow[]>("/admin/registrations/all", { token });
  return response.data || [];
}
