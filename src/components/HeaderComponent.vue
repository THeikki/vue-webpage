<template>
    <header class="header">
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/alerts">Alert values</router-link>
        </nav>
        <router-view/>
    </header>
</template>

<style>
.header {
    background-color: aquamarine;
    position:fixed;
    top:0;
    right:0;
    left:0;
    height:100px;
}
nav {
    padding:30px;
}
a {
    font-weight: bold;
    color: #2c3e50;
}

.router-link-exact-active {
    color: #6eb942;
}
</style>
