<template>
  <div class="min-h-screen bg-background text-foreground">
    <LayoutAppHeader />

    <main class="pt-16 md:pt-20">
      <slot />
      <SectionsContactSection />
    </main>

    <LayoutAppFooter />
  </div>
</template>
