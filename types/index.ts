export type Author = {
  id: string;
  image: string | null;
  username: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  websiteUrl: string;
  authorId: string;
  framework: string;
  style: string;
  useCase: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

export type Comment = {
  author: Author;
  id: string;
  comment: string;
  authorId: string;
  projectId: string;
  createdAt: Date;
};

export interface ProjectWithLikesAndUserLike extends Project {
  _count: {
    Like: number;
  };
  likedByCurrentUser: boolean;
}

export type SearchParamProps = {
   params: { id: string };
   searchParams: { [key: string]: string | string[] | undefined };
};