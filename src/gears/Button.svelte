<script>
export let theme='primary'
export let flat=false
export let inverse=false
</script>


<button class={theme} class:flat={flat} class:inverse={inverse} on:click>
    <slot></slot>
</button>

<style>
button{
    border: 0;
    cursor: pointer;
    border-radius: 6px;
    padding: 8px 12px;
    font-weight: bold;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
}
.primary{
    background: teal;
    color: white;
}
.secondary{
    background: slateblue;
    color: white;
}
.flat{
    box-shadow: none;
}
.primary.inverse{
  background: white;
  color:teal;
  border: 2px solid teal;
}
.secondary.inverse{
  background: white;
  color:slateblue;
  border: 2px solid slateblue;
}
</style>