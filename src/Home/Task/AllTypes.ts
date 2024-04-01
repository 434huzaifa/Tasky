// Define the type for individual documents within the 'docs' array
export interface Doc {
  _id: string;
  user: string;
  status: string;
  title: string;
  description: string;
  startDate: string | null;
  completeDate: string | null;
  __v: number;
}

// Define the type for the entire response object
export interface Response {
  docs: Doc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}

export interface UpdateDoc {
  status?: string;
  title?: string;
  description?: string;
  startDate?: string ;
  completeDate?: string;
}