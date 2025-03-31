<script lang="ts">
    import BackgroundBoxes from '../../../components/boxes.svelte';
    import styles from '../../../lib/css/components.module.css';
    import Sidebar from '../../../components/Sidebar.svelte';
    import HamburgerMenu from '../../../components/HamburgerMenu.svelte';
    import { onMount } from 'svelte';
    import MathEquation from '../../../components/MathEquation.svelte';
    import GithubLink from '../../../components/GithubLink.svelte';
    import Links from '../../../components/Links.svelte';

    // Mobile menu state
    let isMobileMenuOpen = false;
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
    
    // Close mobile menu 
    function closeMobileMenu() {
        isMobileMenuOpen = false;
    }
    
    // Close mobile menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as Element;
        if (isMobileMenuOpen && 
            !target.closest('.sidebar') && 
            !target.closest('.hamburger-menu')) {
            isMobileMenuOpen = false;
        }
    }
    
    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    // Define LaTeX equations for HMNN theory
    const equations = {
        weightPosterior: "p(w|D)",
        gaussianWeight: "w \\sim N(\\mu, \\sigma^2)",
        hiddenStateTransition: "p(Z_t | Z_{t-1})",
        observationEmission: "p(X_t | Z_t)",
        weightTransition: "p(\\theta_t | \\theta_{t-1})",
        dataLikelihood: "p(D_t | \\theta_t)",
        filteringPrediction: "p(\\theta_t | D_1, \\ldots, D_{t-1}) = \\int p(\\theta_t | \\theta_{t-1}) p(\\theta_{t-1} | D_1, \\ldots, D_{t-1}) d\\theta_{t-1}",
        filteringCorrection: "p(\\theta_t | D_1, \\ldots, D_t) \\propto p(D_t | \\theta_t) p(\\theta_t | D_1, \\ldots, D_{t-1})",
        variationalApprox: "q(\\theta_t) \\approx p(\\theta_t | D_1, \\ldots, D_t)",
        gaussianVariational: "q(\\theta_t) = N(\\mu_t, \\sigma_t^2)",
        klDivergence: "KL(q(\\theta_t) || p(\\theta_t | D_1, \\ldots, D_t))",
        elbo: "ELBO(q) = E[\\log p(D_t | \\theta_t)] - KL(q(\\theta_t) || p(\\theta_t | D_1, \\ldots, D_{t-1}))",
        reparamTrick: "w = \\mu + \\sigma \\cdot \\varepsilon, \\quad \\varepsilon \\sim N(0, 1)",
        dropConnect: "q(w) = \\pi \\cdot N(w | \\mu, \\sigma^2) + (1-\\pi) \\cdot N(w | 0, \\sigma_0^2)",
        predictionMean: "E[f(x, \\theta)] \\approx \\frac{1}{K} \\sum_{k=1}^K f(x, \\theta_k), \\quad \\theta_k \\sim q(\\theta)",
        predictionVariance: "Var[f(x, \\theta)] \\approx \\frac{1}{K} \\sum_{k=1}^K (f(x, \\theta_k) - E[f(x, \\theta)])^2"
    };
</script>

<div class="layout" class:menu-open={isMobileMenuOpen}>
    <!-- Hamburger menu button (mobile only) -->
    <HamburgerMenu isOpen={isMobileMenuOpen} on:click={toggleMobileMenu} />
    
    <!-- Overlay for mobile menu -->
    {#if isMobileMenuOpen}
        <button class="mobile-overlay" aria-label="Hamburger navigation" on:click={closeMobileMenu}></button>
    {/if}
    
    <!-- Sidebar component -->
    <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        on:closemenu={closeMobileMenu} 
    />

    <main>
        <BackgroundBoxes />
        <article class={styles.blogPost}>
            <h1>Hidden Markov Neural Networks: A Probabilistic Approach to Sequential Learning</h1>
            
            <div class={styles.postMeta}>
                <span class="date">March 30, 2025</span>
                <span class="author">By Parth Sinha</span>
                <span class="category">Machine Learning & Probabilistic Modeling</span>
            </div>
            
            <div class={styles.postContent}>
                <enhanced:img 
                    src="../../../lib/img/hmnn_moons_decision_boundary.png" 
                    alt="Hidden Markov Neural Network moons decision boundary" 
                    class={styles.floatImage1}
                />
                
                <h1>Introduction</h1>
                <p>Machine learning models often struggle with dynamic, non-stationary environments where data distributions evolve over time—think stock markets, robotics, or climate data. Traditional neural networks assume fixed weights, while Hidden Markov Models (HMMs) excel at sequential data but lack the flexibility of deep learning. Enter Hidden Markov Neural Networks (HMNNs), a powerful hybrid that combines Bayesian Neural Networks (BNNs) with HMMs to model evolving systems with uncertainty quantification.</p>
                
                <p>In this blog post, we’ll dive into:</p>
                <ul>
                    <li>The theoretical foundations of HMNNs.</li>
                    <li>Key mathematical formulations and algorithms.</li>
                    <li>How HMNNs handle concept drift and provide uncertainty estimates.</li>
                    <li>Potential applications and advantages.</li>
                </ul>
                
                <p>By the end, you’ll understand how HMNNs bridge probabilistic reasoning and temporal dynamics for robust sequential learning.</p>
                
                <h2>What Are Hidden Markov Neural Networks?</h2>
                <p>HMNNs extend Bayesian Neural Networks by introducing a Markovian process to model weight evolution over time. Unlike traditional neural networks with fixed weights, HMNNs treat weights as probability distributions (<span class={styles.mathInline}><MathEquation equation={equations.weightPosterior} displayMode={false} /></span>) that evolve according to a transition kernel (<span class={styles.mathInline}><MathEquation equation={equations.weightTransition} displayMode={false} /></span>), while generating observations (<span class={styles.mathInline}><MathEquation equation={equations.dataLikelihood} displayMode={false} /></span>).</p>
                
                <h2>Key Components of HMNNs</h2>
                <ol>
                    <li>
                        <p><strong>Bayesian Neural Networks (BNNs)</strong>: Weights are distributions (e.g., <span class={styles.mathInline}><MathEquation equation={equations.gaussianWeight} displayMode={false} /></span>), enabling uncertainty quantification and regularization.</p>
                    </li>
                    <li>
                        <p><strong>Hidden Markov Models (HMMs)</strong>: Hidden states evolve via <span class={styles.mathInline}><MathEquation equation={equations.hiddenStateTransition} displayMode={false} /></span>, and observations are emitted via <span class={styles.mathInline}><MathEquation equation={equations.observationEmission} displayMode={false} /></span>. In HMNNs, weights are the hidden states.</p>
                    </li>
                    <li>
                        <p><strong>Temporal Weight Dynamics</strong>: Weights transition over time (<span class={styles.mathInline}><MathEquation equation={equations.weightTransition} displayMode={false} /></span>), balancing stability and adaptation.</p>
                    </li>
                </ol>
                
                <h2>Mathematical Foundations</h2>
                <h3>1. Filtering Recursion</h3>
                <p>HMNNs estimate the posterior distribution of weights given data up to time <i>t</i>. This involves:</p>
                <ul>
                    <li><strong>Prediction</strong>: <div class={styles.mathBlock}><MathEquation equation={equations.filteringPrediction} displayMode={true} /></div></li>
                    <li><strong>Correction</strong>: <div class={styles.mathBlock}><MathEquation equation={equations.filteringCorrection} displayMode={true} /></div></li>
                </ul>
                
                <h3>2. Variational Inference</h3>
                <p>Exact posteriors are intractable, so we approximate with a variational distribution <span class={styles.mathInline}><MathEquation equation={equations.variationalApprox} displayMode={false} /></span>, typically Gaussian: <span class={styles.mathInline}><MathEquation equation={equations.gaussianVariational} displayMode={false} /></span>. We minimize the KL divergence:</p>
                <div class={styles.mathBlock}><MathEquation equation={equations.klDivergence} displayMode={true} /></div>
                <p>The Evidence Lower Bound (ELBO) is optimized:</p>
                <div class={styles.mathBlock}><MathEquation equation={equations.elbo} displayMode={true} /></div>
                <p>The reparameterization trick (<span class={styles.mathInline}><MathEquation equation={equations.reparamTrick} displayMode={false} /></span>) ensures gradients flow through sampling.</p>
                
                <h3>3. Variational DropConnect</h3>
                <p>This regularization models weights as a mixture:</p>
                <div class={styles.mathBlock}><MathEquation equation={equations.dropConnect} displayMode={true} /></div>
                <p>It introduces sparsity and prevents overfitting, akin to dropout but probabilistically.</p>
                <h3>4. Uncertainty Quantification</h3>
                <p>HMNNs estimate uncertainty via Monte Carlo sampling:</p>
                <ul>
                    <li>Mean: <div class={styles.mathBlock}><MathEquation equation={equations.predictionMean} displayMode={true} /></div></li>
                    <li>Variance: <div class={styles.mathBlock}><MathEquation equation={equations.predictionVariance} displayMode={true} /></div></li>
                </ul>
                <p>This captures both aleatoric (data) and epistemic (model) uncertainty.</p>
                
                <h2>Handling Concept Drift</h2>
                <p>The transition kernel <span class={styles.mathInline}><MathEquation equation={equations.weightTransition} displayMode={false} /></span> governs adaptation speed. Larger variance allows quick shifts to new patterns, while smaller variance retains past knowledge, naturally balancing stability and plasticity.</p>
                <enhanced:img 
                    src="../../../lib/img/standard_moons_decision_boundary.png" 
                    alt="Standard moons decision boundary" 
                    class={styles.floatImage2}
                />
                <h2>Sequential Learning Process</h2>
                <p>HMNNs operate in two steps per time step:</p>
                <ol>
                    <li><strong>Prediction</strong>: Evolve weights using the transition kernel.</li>
                    <li><strong>Correction</strong>: Update the variational posterior with new data via ELBO optimization.</li>
                </ol>
                
                <h2>Why HMNNs Excel</h2>
                <ul>
                    <li><strong>Uncertainty-Aware</strong>: Robust predictions with confidence estimates.</li>
                    <li><strong>Temporal Adaptation</strong>: Handles non-stationary data effectively.</li>
                    <li><strong>Regularization</strong>: Prevents overfitting through priors and sparsity.</li>
                    <li><strong>Versatility</strong>: Balances old and new knowledge for dynamic environments.</li>
                </ul>
                
                <p>HMNNs are ideal for applications like financial forecasting, robotics, or any domain with evolving patterns and uncertainty.</p>
                <Links url="https://github.com/sinhaparth5/hidden-markov.git" />
            </div>
        </article>
    </main>
</div>

<style>
    .layout {
        position: relative;
        min-height: 100vh;
    }
    
    .main-content {
        width: 100%;
    }
    
    .mobile-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 90;
    }

    .menu-open .mobile-overlay {
        display: block;
    }
</style>