
export interface ProductViewModel {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RateViewModel;
  amount: number;
  size: string;
  isWishList?: boolean;
}
export interface AllProductViewModel {
  id: any;
  item: ProductViewModel;
  quantity: number;
}
export interface RateViewModel {
  rate: number;
  count: number;
}
