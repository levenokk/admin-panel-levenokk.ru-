import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query {
    products {
      title
      id
      img {
        url
      }
      url
    }
  }
`;

export const GET_IMAGES = gql`
  query {
    images {
      url
      id
    }
  }
`;

export const GET_MAILS = gql`
  query mail($id: String) {
    mail(id: $id) {
      name
      email
      read
      message
      id
    }
  }
`;
