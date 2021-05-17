import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { authAction, notificationAction } from '../redux/app/actions'
import { useMutation } from '@apollo/client'
import { SIGN } from '../grapql/mutation/mutation'
import { Note } from '../redux/app/types'

const schema = yup.object().shape({
  login: yup.string().required("Поле обов'язкове"),
  password: yup.string().required("Поле обов'язкове"),
})

const AuthForm: React.FC = () => {
  const [sign] = useMutation<{sign: string}, {login: string, password: string}>(SIGN);

  const dispatch = useDispatch()

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ login: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)

        sign({
          variables: {
            ...values
          }
        }).then(({data})=>{
          localStorage.setItem('token', data!.sign)

          dispatch(authAction(true))
        }).catch((err: Error)=>{
          dispatch(notificationAction(err.message, Note.warning))

          setSubmitting(false)
        })
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
        <Form className="mx-auto">
          <Form.Group controlId="formBasicEmail" className="position-relative">
            <Form.Label>Логін</Form.Label>
            <Form.Control
              name="login"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Логін"
              isInvalid={touched.login && !!errors.login}
            />
            <Form.Control.Feedback type="invalid" tooltip={true}>
              {errors.login}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="position-relative">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              placeholder="Пароль"
              isInvalid={touched.login && !!errors.password}
            />
            <Form.Control.Feedback type="invalid" tooltip={true}>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={isSubmitting}
            variant="primary"
            onClick={() => {
              handleSubmit()
            }}
          >
            Увійти
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default AuthForm
