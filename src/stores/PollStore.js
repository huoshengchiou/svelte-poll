import { writable } from "svelte/store";

const PollStore = writable([
  {
    id: 1,
    question: "JS or JAVA",
    answerA: "JS",
    answerB: "JAVA",
    votesA: 9,
    votesB: 15,
  },
]);

export default PollStore;
