<script lang="ts">
  import { fade } from "svelte/transition";
  import skillsJson from "./skills.json";

  let hide: boolean = false;
</script>

<section class="card">
  <div class="heading toggle">
    <span class="title">
      <h2>Skills</h2>
    </span>
    <span class="accessories">
      <button on:click|preventDefault={() => hide = !hide}>{hide ? 'Show' : 'Hide'}</button>
    </span>
  </div>
  {#if !hide}
    <div class="body" in:fade={{ duration: 250 }} out:fade={{ duration: 250 }}>
      <section class="engrave">
        <h3>Programming Languages</h3>
        <p>{skillsJson.programmingLangs.join(', ')}</p>
      </section>
      <section class="engrave">
        <h3>Frameworks</h3>
        <div class="showcase">
          <section class="engrave">
            <h4>Frontend</h4>
            <p>{skillsJson.frameworks.frontend.join(', ')}</p>
          </section>
          <section class="engrave">
            <h4>Backend</h4>
            <p>{skillsJson.frameworks.backend.join(', ')}</p>
          </section>
        </div>
      </section>
      <section class="engrave">
        <h3>Infrastructure</h3>
        <div class="showcase">
          <section class="engrave">
            <h4>Database</h4>
            <p>{skillsJson.infra.database.join(', ')}</p>
          </section>
          <section class="engrave">
            <h4>Cloud</h4>
            <p>{skillsJson.infra.cloud.join(', ')}</p>
          </section>
        </div>
        <div class="showcase">
          <section class="engrave">
            <h4>CI/CD</h4>
            <p>{skillsJson.infra.cicd.join(', ')}</p>
          </section>
          <section class="engrave">
            <h4>Operating Systems</h4>
            <p>{skillsJson.infra.operatingSystems.join(', ')}</p>
          </section>
        </div>
      </section>
    </div>
  {/if}
</section>

<style>
  section :is(h1, h2, h3, h4) {
    margin: 0 0 0.5rem 0;
  }

  .showcase,
  .showcase :is(:first-child, :last-child) {
    grid-auto-flow: unset;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    justify-content: flex-start;
    align-items: stretch;
    margin: 0;
    padding: 0.25rem;
    width: 100%;
  }

  .engrave {
    margin: 0 0 1rem 0;
  }
</style>
