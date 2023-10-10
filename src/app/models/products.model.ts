
export interface Product {
  id: number;
  productName: string;
  unitPrice: number;
  url: string;
  quantity: number;
  isDiscontinued: boolean;
  newImageUrl?: File;
}