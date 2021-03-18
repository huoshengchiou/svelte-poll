<script>
	import Header from './components/Header.svelte'
	import Footer from './components/Footer.svelte'
	import Tabs from './gears/Tabs.svelte'
	import CreatePoll from './components/CreatePoll.svelte'
	import PollList from './components/PollList.svelte'


    

//tabs
let items=['Current Poll','Add New Poll']
let activeItem='Current Poll'

const changeTabs=e=>{
	activeItem=e.detail
}

let polls=[
	// {
	// 	id:1,
	// 	question:'JS or JAVA',
	// 	answerA:'JS',
	// 	answerB:'JAVA',
	// 	votesA:9,
	// 	votesB:15
	// }
]
const handleAdd=(e)=>{
// const poll=e.detail
// polls=[poll,...polls]
console.log('hello')
 activeItem='Current Poll'
}

const handleVote=(e)=>{
// const {id,source}=e.detail
// let copiedPolls=[...polls]
// let targetPolls=copiedPolls.find(poll=>poll.id===id)
// if(source==='a'){
// 	targetPolls.votesA++
// }
// if(source==='b'){
// 	targetPolls.votesB++
// }
// polls=copiedPolls
}


</script>


<Header/>
<main>
	<Tabs {items} {activeItem} on:tabSwitch={changeTabs}/>
	<!-- <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> -->
{#if activeItem==='Current Poll'}
	<!-- <PollList {polls} on:vote={handleVote}/> -->
	<!-- <PollList  on:vote={handleVote}/> -->
	<PollList  />
	{:else if activeItem==='Add New Poll'}
	<CreatePoll on:add={handleAdd}/>
{/if}

</main>
<Footer/>

<style>
	main{
		max-width:960px;
		margin: 40px auto;
	}
</style>