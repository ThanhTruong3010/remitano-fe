export interface Videos {
  title: string;
  description: string;
  url: string;
  userEmail?: string;
  iframeUrl?: string;
}

export interface Meta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
