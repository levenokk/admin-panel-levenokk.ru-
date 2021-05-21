import { MutationTuple, useMutation } from '@apollo/client';
import { gql } from '@apollo/client/core';

import {
  ADD_IMG,
  ADD_WORK,
  EDIT_IMG,
  REMOVE_IMG,
  REMOVE_MAIL,
  REMOVE_WORK,
  UPDATE_WORK,
} from '../grapql/mutation/mutation';
import { GET_IMAGES, GET_MAILS, GET_PRODUCTS } from '../grapql/query/query';
import {
  addImgData,
  AddProductData,
  Image,
  Mail,
  Product,
  RemoveImgData,
  RemoveMailData,
  RemoveProductData,
  UpdateImgData,
  UpdateProductData,
} from '../grapql/types';

export const UseRemoveWorkMutation = (): MutationTuple<
  RemoveProductData,
  { id: string }
> => {
  return useMutation<RemoveProductData, { id: string }>(REMOVE_WORK, {
    update: (cache, { data }) => {
      const { products } = cache.readQuery({
        query: GET_PRODUCTS,
      }) as { products: Product[] };

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          products: products.filter(
            (product) => product.id !== data!.removeProduct.id,
          ),
        },
      });
    },
  });
};

export const UseAddWorkMutation = (): MutationTuple<
  AddProductData,
  { title: string; img: string; url: string }
> => {
  return useMutation<
    AddProductData,
    { title: string; img: string; url: string }
  >(ADD_WORK, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          products(products = []) {
            const newProductRef = cache.writeFragment({
              data: data!.addProduct,
              fragment: gql`
                fragment addProduct on Product {
                  id
                  title
                  img {
                    url
                  }
                  url
                }
              `,
            });

            return [...products, newProductRef];
          },
        },
      });
    },
  });
};

export const UseUpdateWorkMutation = (): MutationTuple<
  UpdateProductData,
  { title: string; id: string; url: string; img: string }
> => {
  return useMutation<
    UpdateProductData,
    { title: string; id: string; url: string; img: string }
  >(UPDATE_WORK, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          products(products: Product[]) {
            return products.map((item) =>
              item.id === data!.updateProduct!.id ? data!.updateProduct : item,
            );
          },
        },
      });
    },
  });
};

export const UseRemoveImgMutation = (): MutationTuple<
  RemoveImgData,
  { id: string }
> => {
  return useMutation<RemoveImgData, { id: string }>(REMOVE_IMG, {
    update: (cache, { data }) => {
      const { images } = cache.readQuery({
        query: GET_IMAGES,
      }) as { images: Image[] };

      cache.writeQuery({
        query: GET_IMAGES,
        data: {
          images: images.filter((image) => image.id !== data!.removeImg.id),
        },
      });
    },
  });
};

export const UseAddImgMutation = (): MutationTuple<
  addImgData,
  { file: File }
> => {
  return useMutation<addImgData, { file: File }>(ADD_IMG, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          images(images = []) {
            const newImageRef = cache.writeFragment({
              data: data!.addImg,
              fragment: gql`
                fragment addImg on Image {
                  id
                  url
                }
              `,
            });

            return [...images, newImageRef];
          },
        },
      });
    },
  });
};

export const UseUpdateImgMutation = (): MutationTuple<
  UpdateImgData,
  { id: string; file: File }
> => {
  return useMutation<UpdateImgData, { id: string; file: File }>(EDIT_IMG, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          images(images: Image[]) {
            return images.map((item) =>
              item.id === data!.updateImg.id ? data!.updateImg : item,
            );
          },
        },
      });
    },
  });
};

export const UseRemoveMailMutation = (): MutationTuple<
  RemoveMailData,
  { id: string }
> => {
  return useMutation<RemoveMailData, { id: string }>(REMOVE_MAIL, {
    update: (cache, { data }) => {
      const { mail } = cache.readQuery({
        query: GET_MAILS,
      }) as { mail: Mail[] };

      cache.writeQuery({
        query: GET_MAILS,
        data: {
          mail: mail.filter((mail) => mail.id !== data!.removeMail.id),
        },
      });
    },
  });
};
