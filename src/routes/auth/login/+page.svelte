<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { loginSchema, type LoginFormData } from '$lib/schema/auth';
    import type { ZodError } from 'zod';
    import styles from '../../../lib/css/AuthForm.module.css';

    interface LoginSuccess {
        success: true;
        redirectTo: string;
    }

    let formData: LoginFormData = { email: '', password: '' };
    let errors: Record<string, string> = {};
    let loading = false;

    function validateForm(): boolean {
        try {
            loginSchema.parse(formData);
            errors = {};
            return true;
        } catch (err) {
            const zodError = err as ZodError;
            errors = zodError.errors.reduce((acc, curr) => {
                if (curr.path.length > 0) acc[curr.path[0].toString()] = curr.message;
                return acc;
            }, {} as Record<string, string>);
            return false;
        }
    }

    function handleInput(): void {
        if (Object.keys(errors).length > 0) validateForm();
    }

    // Type guard to check if data matches LoginSuccess
    function isLoginSuccess(data: unknown): data is LoginSuccess {
        return (
            typeof data === 'object' &&
            data !== null &&
            'success' in data &&
            data.success === true &&
            'redirectTo' in data &&
            typeof (data as any).redirectTo === 'string'
        );
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class={styles.authContainer}>
    <div class={styles.authForm}>
        <h1>Log in to your account</h1>

        {#if $page.form?.error}
            <div class={styles.error}>{$page.form.error}</div>
        {/if}

        <form
            method="POST"
            use:enhance={() => {
                if (!validateForm()) {
                    return ({ update }) => update({ reset: false });
                }
                loading = true;
                return async ({ result, update }) => {
                    loading = false;
                    if (result.type === 'success' && result.data?.success) {
                        // Invalidate and then force a full page reload
                        await invalidateAll();
                        
                        if (isLoginSuccess(result.data)) {
                            window.location.href = result.data.redirectTo;
                        } else {
                            window.location.href = '/';
                        }
                    } else {
                        await update();
                    }
                };
            }}
        >
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

            <button
                type="submit"
                disabled={loading}
                class={styles.btnPrimary}
            >
                {loading ? 'Logging in...' : 'Log in'}
            </button>
        </form>

        <div class={styles.authFooter}>
            Don't have an account? <a href="/auth/register">Register</a>
        </div>
    </div>
</div>
