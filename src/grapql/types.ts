export interface Product {
  id: string
  title: string
  url: string
  img: {
    url: string
  }
}

export interface ProductsData {
  products: Product[]
}

export interface RemoveProductData {
  removeProduct: Product
}

export interface AddProductData {
  addProduct: Product
}

export interface UpdateProductData {
  updateProduct: Product
}

export interface Image {
  id: string
  url: string
}

export interface Images {
  images: Image[]
}

export interface RemoveImgData {
  removeImg: Image
}

export interface addImgData {
  addImg: Image
}

export interface UpdateImgData {
  updateImg: Image
}

export interface Mail {
  name: string
  email: string
  message: string
  read: boolean
  id: string
}

export interface MailData {
  mail: Mail[]
}

export interface RemoveMailData {
  removeMail: { id: string }
}

export interface UpdateMailData {
  updateMail: Mail
}
