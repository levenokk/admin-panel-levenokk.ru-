import { gql } from '@apollo/client/core';

export const REMOVE_WORK = gql`
  mutation removeProduct($id: String!) {
    removeProduct(id: $id) {
      id
    }
  }
`;

export const ADD_WORK = gql`
  mutation addProduct($title: String!, $img: String!, $url: String!) {
    addProduct(title: $title, img: $img, url: $url) {
      id
      title
      img {
        url
      }
      url
    }
  }
`;

export const UPDATE_WORK = gql`
  mutation updateProduct(
    $id: String!
    $title: String
    $img: String
    $url: String
  ) {
    updateProduct(id: $id, data: { title: $title, img: $img, url: $url }) {
      img {
        url
      }
      id
      title
      url
    }
  }
`;

export const REMOVE_IMG = gql`
  mutation removeImg($id: String!) {
    removeImg(id: $id) {
      id
      url
    }
  }
`;

export const ADD_IMG = gql`
  mutation addImg($file: Upload!) {
    addImg(file: $file) {
      url
      id
    }
  }
`;

export const EDIT_IMG = gql`
  mutation updateImg($id: String!, $file: Upload!) {
    updateImg(id: $id, file: $file) {
      id
      url
    }
  }
`;

export const SIGN = gql`
  mutation sign($login: String!, $password: String!) {
    sign(login: $login, password: $password)
  }
`;

export const REMOVE_MAIL = gql`
  mutation removeMail($id: String!) {
    removeMail(id: $id) {
      id
    }
  }
`;

export const UPDATE_MAIL = gql`
  mutation updateMail($id: String!, $read: Boolean) {
    updateMail(id: $id, data: { read: $read }) {
      id
      message
      name
      email
      read
    }
  }
`;

export const CHECK_AUTH = gql`
  mutation {
    checkAuth
  }
`;
