type Author = {
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

export interface ProjectWithLikesAndUserLike extends Project {
   _count: {
      Like: number;
   };
   likedByCurrentUser: boolean;
}
