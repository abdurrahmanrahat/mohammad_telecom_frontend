export type TCategory = {
  _id: string;
  title: string;
  subCategories: TCategory[]; // Recursive type
};
