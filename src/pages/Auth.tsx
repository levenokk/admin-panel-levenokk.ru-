import React, { useEffect } from 'react'
import styles from '../styles/Auth.module.scss'
import Form from '../components/Form'

const Auth: React.FC = () => {
  useEffect(() => {
    document.title = 'Авторизація'
  }, [])

  return (
    <div className={styles.form}>
      <h1 className="mb-3 text-center">Авторизація</h1>
      <Form />
    </div>
  )
}

export default Auth
