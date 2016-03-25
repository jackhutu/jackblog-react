// export function fetchInitialData(dispatch, components, params) {
//   const needs = components.reduce( (prev, current) => {
//     return (current.need || [])
//       .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
//       .concat(prev);
//     }, []);
//     const promises = needs.map(need => {
//     	return dispatch(need(params))
//     });
//     return Promise.all(promises);
// }

// export function fetchAllData(dispatch, components, params) {
//   //const needs = components.reduce( (prev, current) => {
//     // return (current.need || [])
//     //   .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
//     //   .concat(prev);
//     // }, []);
//   const needs = components
//     	.filter(x=>x.fetchData)
//     	.reduce((prev,current)=>{
//     		return current.fetchData(params).concat(prev)
//     	},[])
//     	.map(x=>dispatch(x))
//     	console.log(needs);
//   return Promise.all(needs)
//   //   const promises = needs.map(need => {
//   //   	return dispatch(need(params))
//   //   });
//     // return Promise.all(
//     // 	components
//     // 	.filter(x=>x.fetchData)
//     // 	.map(x=>x.fetchData(params))
//     // 	.map(x=>dispatch(x)));
// }