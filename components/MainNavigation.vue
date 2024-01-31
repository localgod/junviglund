<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/">
        Junviglund
      </NuxtLink>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink class="nav-link active" to="/">
              Hjem
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/mapView">
              Kort
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
