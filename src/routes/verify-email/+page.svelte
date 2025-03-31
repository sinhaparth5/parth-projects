  <script lang="ts">
    import styles from '../../lib/css/AuthForm.module.css';
    import '../../lib/css/global.css';
  </script>
  <svelte:head>
    <title>Verify Your Email</title>
  </svelte:head>
  
  <div class={styles.verifyContainer}>
    <div class={styles.verifyCard}>
      <h1>Check your email</h1>
      <p>
        We've sent you a verification email. Please check your inbox and click the link to verify your account.
      </p>
      <p class={styles.info}>
        If you don't see the email, check your spam folder. The email might take a few minutes to arrive.
      </p>
      <div class={styles.actions}>
        <a href="/auth/login" class={styles.btnLink}>Back to login</a>
      </div>
    </div>
  </div>