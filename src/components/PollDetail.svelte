<script>
  import { createEventDispatcher } from "svelte";
  import Card from "../gears/Card.svelte";
  import PollStore from "../stores/PollStore.js";
  import Button from "../gears/Button.svelte";
  // 有tween的機制可以產生畫格，形成動畫，讓所以改變是連續性的
  import { tweened } from "svelte/motion";

  const dispatch = createEventDispatcher();

  export let poll;

  //reactive
  $: totalVotes = poll.votesA + poll.votesB;
  $: precentA = Math.floor((100 / totalVotes) * poll.votesA) || 0; //不為number狀態下跑0
  $: precentB = Math.floor((100 / totalVotes) * poll.votesB) || 0;
  //tweed percentages
  const tweenedA = tweened(0);
  const tweenedB = tweened(0);
  //把終點值連接到tweed的變數處理
  $: tweenedA.set(precentA);
  $: tweenedB.set(precentB);
  //   $: console.log($tweenedA, $tweenedB);

  const handleVote = (source, id) => {
    // dispatch('vote',{source,id})
    PollStore.update((pre) => {
      let copiedPolls = [...pre];
      let targetPoll = copiedPolls.find((poll) => poll.id === id);
      if (source === "a") {
        targetPoll.votesA++;
      }
      if (source === "b") {
        targetPoll.votesB++;
      }
      return copiedPolls;
    });
  };

  const handleDelete = (id) => {
    PollStore.update((pre) => pre.filter((poll) => poll.id !== id));
  };
</script>

<Card>
  <div class="poll">
    <h3>{poll.question}</h3>
    <p>Total Vote {totalVotes}</p>
    <div class="answer" on:click={() => handleVote("a", poll.id)}>
      <div class="percent percent-a" style="width:{$tweenedA}%" />
      <span>{poll.answerA} ({poll.votesA})</span>
    </div>
    <div class="answer" on:click={() => handleVote("b", poll.id)}>
      <div class="percent percent-b" style="width:{$tweenedB}%" />
      <span>{poll.answerB} ({poll.votesB})</span>
    </div>
    <div class="delete">
      <Button
        theme="secondary"
        flat={true}
        on:click={() => handleDelete(poll.id)}>delete</Button
      >
    </div>
  </div>
</Card>

<style>
  h3 {
    margin: 0 auto;
    color: #555;
  }
  p {
    margin-top: 6px;
    font-size: 14px;
    color: #aaa;
    margin-bottom: 30px;
  }
  .answer {
    background: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }
  .answer:hover {
    opacity: 0.6;
  }
  span {
    display: inline-block;
    padding: 10px 20px;
  }
  .percent {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }
  .percent-a {
    border-left: 4px solid red;
    background: rgba(217, 27, 66, 0.2);
  }
  .percent-b {
    border-left: 4px solid teal;
    background: rgba(69, 196, 66, 0.2);
  }
  .delete {
    margin-top: 30px;
    text-align: center;
  }
</style>
