<template>
    <footer class="footer">
      <div class="center">
        <p>Heikki Törmänen @2022</p>
      </div>
    </footer>
</template>

<style>
.footer {
  position: fixed;
  bottom: 0;
  height: 100px;
  background-color:rgb(131, 191, 199);
  left: 0;
  right: 0;
  margin: 0;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
p {
  text-align: center;
}
</style>
