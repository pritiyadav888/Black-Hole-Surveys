
(function(){
    function start(){
        let numberQuestion = document.querySelectorAll('[name="questions"]').length;

    
        // function warningDeleteButton(){
        //     let deleteButtons = document.querySelectorAll('.btn-danger');
        //     for(button of deleteButtons){
        //         button.addEventListener('click',(event)=>{
        //             if (!confirm("Are you sure?")){
        //                 event.preventDefault();
        //             }
        //         });
        //     }
        // }
        
        function addEventListenerforChoices(){
            let addChoicesButtons = document.querySelectorAll("#btnAddchoices");
            addChoicesButtons.forEach((button)=>{
                button.addEventListener('click', (e)=>{
                    let prevSibling = button.previousElementSibling;
                    const element = prevSibling.cloneNode(true);
                    element.querySelector('input').value = "";
                    e.target.parentNode.insertBefore(element, e.target);
                    let btnDeleteChoice = element.querySelector("#btnDeleteChoice");
                    btnDeleteChoice.addEventListener('click', (event)=>{
                        // let prevSibling2 = btnDeleteChoice.previousElementSibling;
                        // prevSibling2.remove();
                        event.target.parentNode.remove();
                    });
                });
            });
        }

        function addEventListenerforDeleteChoices(){
            let deleteChoicesButtons = document.querySelectorAll("#btnDeleteChoice");
            deleteChoicesButtons.forEach((button)=>{
                button.addEventListener('click', (e)=>{
                    // let prevSibling = button.previousElementSibling;
                    // prevSibling.remove();
                    e.target.parentNode.remove();
                });
            });
        }

        function addEventListenerforDeleteQuestions(){
            let deleteQuestionsButtons = document.querySelectorAll("#btnDeleteQuestion");
            deleteQuestionsButtons.forEach((button)=>{
                button.addEventListener('click', (e)=>{
                    // const elem = document.createElement('button');
                    // elem.classList.add('btn','btn-danger','btn-sm');
                    // elem.setAttribute('id','btnDeleteQuestion');
                    // elem.setAttribute('type','button');
                    // elem.innerHTML = '<i class="fas fa-trash"></i> Delete question';

                    const elem = button.cloneNode(true);
                    const etarget = e.target.parentNode.parentNode.previousElementSibling;
                    etarget.querySelector('input').after(elem);
                    e.target.parentNode.parentNode.remove();
                    numberQuestion--;
                    addEventListenerforDeleteQuestions();
                });
            });
        }
        
        addEventListenerforChoices();
        addEventListenerforDeleteChoices();
        addEventListenerforDeleteQuestions();
        //warningDeleteButton();
        let addQuestionButton = document.querySelector("#btnAddQuestion");
        addQuestionButton.addEventListener('click', (event)=>{
            const elem = document.createElement('tr');
            document.querySelectorAll("#btnDeleteQuestion").forEach((btnDeleteQuestion)=>{
                btnDeleteQuestion.remove();
            });
            elem.classList.add('d-flex');
            elem.innerHTML = `<td class="text-center col-7"><input type="text" name="questions" placeholder="Enter the question"">
                <button class="btn btn-danger btn-sm" id = "btnDeleteQuestion" type="button" > <i class="fas fa-trash"></i> Delete question</button>
            </td>
            <td class="text-left col-5">
                <ul>
                    <li>
                        <input type="text" name="choices${numberQuestion++}" placeholder="Enter the choice">
                        <button class="btn btn-danger btn-sm" id = "btnDeleteChoice" type="button" > <i class="fas fa-trash"></i> Delete choice</button>
                    </li>
                </ul>
                <button class="btn btn-primary" id = "btnAddchoices"  type = "button"> <i class="fas fa-plus"></i> Add choice</button>
            </td>`;
            event.target.parentNode.parentNode.parentNode.insertBefore(elem, event.target.parentNode.parentNode);
            let btnDeleteChoice = elem.querySelector("#btnDeleteChoice");
            let btnAddChoice = elem.querySelector("#btnAddchoices");
            //let btnDeleteQuestion = elem.querySelector("#btnDeleteQuestion");
            addEventListenerforDeleteQuestions();
            btnDeleteChoice.addEventListener('click', (e)=>{
                // let prevSibling = btnDeleteChoice.previousElementSibling;
                // prevSibling.remove();
                e.target.parentNode.remove();
            });
            btnAddChoice.addEventListener('click', (e)=>{
                let prevSibling = btnAddChoice.previousElementSibling;
                const element = prevSibling.cloneNode(true);
                element.querySelector('input').value = "";
                e.target.parentNode.insertBefore(element, e.target);
                let btnDeleteChoice = element.querySelector("#btnDeleteChoice");
                btnDeleteChoice.addEventListener('click', (event2)=>{
                    // let prevSibling2 = btnDeleteChoice.previousElementSibling;
                    // prevSibling2.remove();
                    event2.target.parentNode.remove();
                });
            });
            // btnDeleteQuestion.addEventListener('click', (e)=>{
            //     const elem = button.cloneNode(true);
            //     const etarget = e.target.parentNode.parentNode.previousElementSibling;
            //     etarget.querySelector('input').after(elem);
            //     e.target.parentNode.parentNode.remove();
            //     numberQuestion--;
            // });
            //warningDeleteButton();
        });

    }
    window.addEventListener("load", start);
})();