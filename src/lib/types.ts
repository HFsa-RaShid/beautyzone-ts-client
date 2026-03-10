// Shared domain types for BeautyZone client

export type Product = {
  _id: string; 
  name: string;
  price: number;
  images: string[]; 
  category?: string;
  STRAIGHT_UP?: string; 
  THE_LOWDOWN?: string;
  details?: string;
  stock?: number;
  rating?: number;
  reviewsCount?: number;
};

export type ProductsApiResponse = {
  success: boolean;
  data: {
    products: Product[];
    total: number;
    page: number;
    limit: number;
  };
  length?: number;
};

export type Review = {
  _id: string; 
  productId: string;
  userName: string;
  userEmail: string;
  userPhoto: string;
  rating: number;
  comment: string;
  date: string; 
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
};


export type AuthResponse = {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  message: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};


export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

export interface ProductPayload {
  name: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  details: string;
  images: string[];
}


// Shared domain types এ নতুন যুক্ত করুন

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
};

export type Order = {
  _id: string;
  transactionId: string;
  items: OrderItem[];
  amount: number;
  customer: Customer;
  paidStatus: boolean;
  orderDate: string;
};
