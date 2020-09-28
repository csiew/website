<template>
  <div>
    <div class="section width-full width-max-640 margin-auto-horizontal">
      <div class="section-header">
        <h2>About</h2>
      </div>
      <div class="card padding-m">
        <p>
          Clarence is a software engineer who is perhaps best known for creating illume OS and Antorca Linux. These days he's mostly involved in full-stack web development and mobile app development.
        </p>
        <p>
          He completed a Bachelor of Software Engineering at Monash University in March 2020. He currently lives in Melbourne, Australia. He was born and raised in Penang, Malaysia.
        </p>
        <div class="grid grid-col-2 grid-col-auto-fit-640 grid-gap-m margin-s-top margin-m-bottom nodrag img-dark-mode-invert only-desktop">
          <div class="grid grid-col-1">
            <img class="grid-item" src="@/assets/images/Penang.png" style="box-sizing: border-box; object-fit: content; max-width: 233px; max-height: 240px; width: auto; height: auto;" />
            <span class="width-full text-align-center text-color-secondary"><small>Penang, Malaysia</small></span>
          </div>
          <div class="grid grid-col-1">
            <img class="grid-item" src="@/assets/images/Victoria.png" style="box-sizing: border-box; object-fit: content; max-width: 328px; max-height: 240px; width: auto; height: auto;" />
            <span class="width-full text-align-center text-color-secondary"><small>Victoria, Australia</small></span>
          </div>
        </div>
        <p>
          Post-punk &amp; surf rock (The National, IDLES, Heavy Lungs, Good Boy, Hockey Dad) and caffeine (coffee in the day, tea at night) are the best brain fuel for software development. Some of his hobbies include programming (of course), playing Minecraft (specifically planning and building cities), and graphic design (pixel art).
        </p>
      </div>
    </div>
    <div class="section width-full width-max-640 margin-auto-horizontal">
      <div class="section-header">
        <h3>Skills</h3>
      </div>
      <div class="card padding-m">
        <h4 class="padding-s-bottom">Programming Languages</h4>
        <ul class="grid grid-gap-m grid-col-2 grid-col-auto-fit-640 padding-m-left">
          <li>JavaScript</li>
          <li>Python</li>
          <li>Swift</li>
          <li>Java</li>
          <li>Kotlin</li>
          <li>HTML/CSS</li>
          <li>Bash</li>
        </ul>
        <h4 class="padding-m-top padding-s-bottom">Frameworks</h4>
        <div class="grid grid-gap-m grid-col-2 grid-col-auto-fit-640">
          <div class="grid-item">
            <h5>Frontend</h5>
            <ul class="grid grid-gap-m grid-col-1 padding-m-left">
              <li>React</li>
              <li>Vue</li>
              <li>SwiftUI</li>
            </ul>
          </div>
          <div class="grid-item">
            <h5>Backend</h5>
            <ul class="grid grid-gap-m grid-col-1 padding-m-left">
              <li>Node.js</li>
              <li>Express</li>
              <li>Spring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
