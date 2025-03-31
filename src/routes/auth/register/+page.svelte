<!-- src/routes/auth/register/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { registerSchema, type RegisterFormData } from '$lib/schema/auth';
  import type { ZodError } from 'zod';
  import styles from "../../../lib/css/AuthForm.module.css";
  
  let formData: RegisterFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  let errors: Record<string, string> = {};
  let loading = false;
  
  function validateForm() {
    try {
      registerSchema.parse(formData);
      errors = {};
      return true;
    } catch (err) {
      const zodError = err as ZodError;
      errors = zodError.errors.reduce((acc, curr) => {
        if (curr.path.length > 0) {
          acc[curr.path[0].toString()] = curr.message;
        }
        return acc;
      }, {} as Record<string, string>);
      
      return false;
    }
  }
  
  function handleInput() {
    if (Object.keys(errors).length > 0) {
      validateForm();
    }
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class={styles.authContainer}>
  <div class={styles.authForm}>
    <h1>Create an account</h1>
    
    {#if $page.form?.error}
      <div class={styles.error}>{$page.form.error}</div>
    {/if}
    
    <form method="POST" use:enhance={() => {
      if (!validateForm()) {
        return ({ update }) => {
          update({ reset: false });
        };
      }
      
      loading = true;
      
      return async ({ result, update }) => {
        loading = false;
        
        if (result.type === 'success') {
          // Check if a redirect URL was provided
          if (result.data?.redirectTo && typeof result.data.redirectTo === 'string') {
            goto(result.data.redirectTo);
          } else {
            goto('/verify-email'); // Default redirect to verification page
          }
        } else if (result.type === 'redirect' && result.location) {
          goto(result.location);
        } else {
          await update();
        }
      };
    }}>
      <div class={styles.formGroup}>
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          bind:value={formData.username} 
          on:input={handleInput}
          class={errors.username ? styles.errorInput : ''}
          required
        />
        {#if errors.username}
          <p class={styles.fieldError}>{errors.username}</p>
        {/if}
      </div>
      
      <div class={styles.formGroup}>
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          bind:value={formData.email} 
          on:input={handleInput}
          class={errors.email ? styles.errorInput : ''}
          required
        />
        {#if errors.email}
          <p class={styles.fieldError}>{errors.email}</p>
        {/if}
      </div>
      
      <div class={styles.formGroup}>
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          bind:value={formData.password} 
          on:input={handleInput}
          class={errors.password ? styles.errorInput : ''}
          required
        />
        {#if errors.password}
          <p class={styles.fieldError}>{errors.password}</p>
        {/if}
      </div>
      
      <div class={styles.formGroup}>
        <label for="confirmPassword">Confirm Password</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          bind:value={formData.confirmPassword} 
          on:input={handleInput}
          class={errors.confirmPassword ? styles.errorInput : ''}
          required
        />
        {#if errors.confirmPassword}
          <p class={styles.fieldError}>{errors.confirmPassword}</p>
        {/if}
      </div>
      
      <button 
        type="submit" 
        disabled={loading} 
        class={styles.btnPrimary}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
    
    <div class={styles.authFooter}>
      Already have an account? <a href="/auth/login">Log in</a>
    </div>
  </div>
</div>