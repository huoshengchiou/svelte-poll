<script>
  import { fade, slide, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import PollDetail from "./PollDetail.svelte";
  import PollStore from "../stores/PollStore.js";
  import { onMount, onDestroy } from "svelte";

  export let polls = [];
  //從store 拉出value=>store會一直存在
  //必須清除subscribe當component消失
  //會return一個fn，只要invoke就會解除subscribe
  const unsub = PollStore.subscribe((data) => {
    polls = data;
  });
  onMount(() => {
    //get data from db
    console.log("component mounted");
  });
  onDestroy(() => {
    console.log("leave component");
    unsub();
  });
</script>

<div class="poll-list">
  <!-- {#each  polls as poll (poll.id)} -->
  <!-- 這種寫法會自動解除訂閱當component leave 省略上面的長寫法-->
  {#each $PollStore as poll, index (poll.id)}
    <!-- <div transition:fade > -->
    <!-- 可以用local限縮作用範圍 -->
    <!-- animate:flip={{ duration: 500 }} -->
    <div in:fade out:scale|local>
      <!-- 無法省略要一路傳到最上 -->
      <!-- <PollDetail {poll} on:vote/> -->
      <PollDetail {poll} />
    </div>
  {/each}
</div>

<style>
  .poll-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
</style>
