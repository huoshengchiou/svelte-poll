<script>
import PollStore from '../stores/PollStore.js'
import Button from '../gears/Button.svelte'
import {createEventDispatcher}from 'svelte'

const dispatch=createEventDispatcher()


let  fields={question:'',answerA:'',answerB:''}
let  errors={question:'',answerA:'',answerB:''}
let  valid=false

const handleAddPoll=()=>{
    valid=true //reset
  //validate
  //無法用拆解的省略寫法
//   let {question,answerA,answerB}=errors
errors.question=''//reset
errors.answerA=''
errors.answerB=''
  if(fields.question.trim().length<5){
    valid=false
    errors.question='question must > 5'
  }
  if(fields.answerA.trim().length<1){
    valid=false
    errors.answerA='answerA must > 1'
  }
  if(fields.answerB.trim().length<1){
    valid=false
    errors.answerB='answerB must > 1'
  }
//   add new poll

   if(valid){
    let poll={...fields,votesA:0,votesB:0 ,id:Math.random()}
    // dispatch('add',poll)
    //update 接受call back來處理資料，一樣可以拿到原始的
    PollStore.update(pre=>[poll,...pre])
    //為了另外的行為
    dispatch('add')
   }

}


</script>

<form on:submit|preventDefault={handleAddPoll}>
<div class="form-filed">
    <label for="question">Poll Question :</label>
 <input type="text" id="question" bind:value={fields.question}>
 <div class="error">{errors.question}</div>
</div>
<div class="form-filed">
    <label for="answerA">Answer A :</label>
 <input type="text" id="answerA" bind:value={fields.answerA}>
 <div class="error">{errors.answerA}</div>

</div>
<div class="form-filed">
    <label for="answerB">Answer B :</label>
 <input type="text" id="answerB" bind:value={fields.answerB}>
 <div class="error">{errors.answerB}</div>

</div>
<Button theme='primary'>Add poll</Button>

</form>

<style>
form{
    width: 400px;
    margin: 0 auto;
    text-align: center;
}
.form-filed{
    margin: 18px auto;
}
input{
    width: 100%;
    border-radius: 6px;
}
label{
    margin: 10px auto;
    text-align: left;
}
.error{
    font-weight: bold;
    font-size: 12px;
    color: red;   
}


</style>