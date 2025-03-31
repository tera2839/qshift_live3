function setShift(h) {
    const hiddenValue = h.split(":");
    const plan = hiddenValue[0];
    const date = hiddenValue[1];
    const name = hiddenValue[2];
  
    const cells = document.querySelectorAll(".cells");
    cells.forEach(c => {
      if(c.dataset.id === plan) {
        const dates = c.querySelectorAll(".time-cell");
        dates.forEach(d => {
          if(d.dataset.id === date) {
            const def = d.querySelector(".def");
            if(def) {
              def.remove();
            }
            const member = document.querySelectorAll(".member-hidden");
            const cell = document.createElement("select");
            cell.classList.add("input-cell");
  
            member.forEach(m => {
			  if(m.value !== "") {
				const op = document.createElement("option");
				op.value = m.value;
				op.innerHTML = m.value;
				
				if(name === m.value) {
				op.selected = true;
				op.disabled = true;
				}
				
				cell.appendChild(op);
			  }
            })
            const op = document.createElement("option");
            op.value = "";
            op.innerHTML = "選択無し";
            cell.prepend(op);
            
            
            cell.addEventListener("change", function() {selectlogic(cell,d)});
  
            
            d.appendChild(cell);
  
            const defalut = document.createElement("select");
            defalut.className = "input-cell def";
            member.forEach(m => {
			  if(m.value !== "") {
				const op = document.createElement("option");
				op.value = m.value;
				op.innerHTML = m.value;
				defalut.appendChild(op);
			  }
            })
            const opt = document.createElement("option");
            opt.value = "";
            opt.innerHTML = "選択無し";
            opt.selected = true;
            defalut.prepend(opt);
  
  
  
            defalut.addEventListener("change", function() {defaultLogic(defalut,d)});
            d.appendChild(defalut);
          }
        })
      }
    })
  }
  
  function selectlogic(cell,d) {
    
    const member = document.querySelectorAll(".member-hidden");
    if (cell.value === "") {
      const nextElem = cell.nextElementSibling;
      
      if (nextElem && nextElem.classList.contains("def")) {
          cell.classList.add("def");
          nextElem.remove();
      }else {
        cell.remove();
      }
    } else {
      cell.classList.remove("def");
      const i = document.createElement("select");
      i.className = "input-cell def";
      member.forEach(m => {
		if(m.value !== "") {
			const op = document.createElement("option");
			op.value = m.value;
			op.innerHTML = m.value;
			i.appendChild(op);
		}
      })
      const opt = document.createElement("option");
      opt.value = "";
      opt.innerHTML = "選択無し";
      opt.selected = true;
      i.prepend(opt);
      i.addEventListener("change", function() {selectlogic(i,d)});
      d.appendChild(i);
    }
  }
  
  function defaultLogic(def,d) {
    const member = document.querySelectorAll(".member-hidden");
    if (def.value === "") {
      const nextElem = def.nextElementSibling;
      
      if (nextElem && nextElem.classList.contains("def")) {
          console.log("削除対象の要素:", nextElem); 
          def.value = "";
          def.classList.add("def");
          nextElem.remove();
      } else {
        def.remove();
      }
    } else {
      def.classList.remove("def");
      const i = document.createElement("select");
      i.className = "input-cell def";
      member.forEach(m => {
		if(m.value !== "") {
			const op = document.createElement("option");
			op.value = m.value;
			op.innerHTML = m.value;
			i.appendChild(op);
		}
      })
      const option = document.createElement("option");
      option.value = "";
      option.innerHTML = "選択無し";
      option.selected = true;
      i.prepend(option);
      i.addEventListener("change", function() {selectlogic(i,d)});
      d.appendChild(i);
    }
  }
  
  function setNum(number) {
    const value = number.split(":");
    const date = value[0];
    const plan = value[1];
    const num = value[2];
  
    const cells = document.querySelectorAll(".cells");
    
    cells.forEach(c => {
      const dates = c.querySelectorAll(".time-cell");
      dates.forEach(d => {
        if(d.dataset.id === date && c.dataset.id === plan) {
          const input = d.querySelector(".num-input");
          input.setAttribute("value", num);
        }
      })
    })
  }
  
  function setNumBox(c) {
	const div = document.createElement("div");
	  div.className = "num-box";

	  const input = document.createElement("input");
	  input.type = "text";
	  input.placeholder = "0"
	  input.setAttribute("value", "");
	  input.className = "num-input";
	  
	  const text = document.createElement("p");
	  text.className = "num-text";
	  text.innerHTML = "人数:";

	  div.appendChild(text);
	  div.appendChild(input);
	  c.prepend(div);
  }
  
  const load = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(i => {
      i.addEventListener("input",function() {
        i.value = i.value.replace(/[^0-9]/g, '');  
        if(i.value.length >=  3) {
          i.value = i.value.slice(0, 3); 
        }
      })
    })
  }
  
  document.addEventListener("DOMContentLoaded", function() {
      const hiddens = document.querySelectorAll(".member-shift-hidden");
      hiddens.forEach(h => {
        setShift(h.value);
      })
  
      const cells = document.querySelectorAll(".time-cell");
      
      cells.forEach(updateClass);
  
      const observer = new MutationObserver((mutationsList) => {
          mutationsList.forEach(mutation => {
              if (mutation.type === "childList") {
                  updateClass(mutation.target);
              }
          });
      });
  
      cells.forEach(c => {
          observer.observe(c, { childList: true });
      });
  
      function updateClass(cell) {
          if (cell.children.length > 2) {
              cell.classList.add("in");
          } else {
              cell.classList.remove("in");
          }
      }
  
      const chengeColor = new MutationObserver(mList => {
        mList.forEach(m => {
          const target = m.target;
          
          const prenum = target.querySelectorAll(".input-cell").length;
          const num = target.querySelector(".num-input").value;
        
          if(prenum - 1 === Number(num)) {
            target.classList.add("enough");
          } else {
            target.classList.remove("enough");
          }
        })
      })
      
      cells.forEach(c => {
        setNumBox(c);
        chengeColor.observe(c, {childList: true});
      })
  
      const nums = document.querySelectorAll(".shift-num-hidden");
      
      nums.forEach(n => {
        setNum(n.value);
      })
  
      const timeCells = document.querySelectorAll(".time-cell");
  
      function updateSelectOptions(timeCell) {
        const inputs = timeCell.querySelectorAll("select");
        const selectedValues = new Set();
        inputs.forEach(input => {
          if (input.value !== "") {
            selectedValues.add(input.value);
          }
        });
      
        inputs.forEach(input => {
          const options = input.querySelectorAll("option");
          options.forEach(option => {
            if (selectedValues.has(option.value) && option.value !== input.value) {
              option.disabled = true;
            } else {
              option.disabled = false;
            }
          });
        });
      }
      
      function setupNewSelects(timeCell) {
        const inputs = timeCell.querySelectorAll("select");
        inputs.forEach(input => {
          input.addEventListener("change", () => {
            updateSelectOptions(timeCell);
          });
        });
        updateSelectOptions(timeCell);
      }
  
      timeCells.forEach(t => {
        setupNewSelects(t);
      });
      
      const observers = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach(node => {
              if (node.tagName === "SELECT") {
                const timeCell = node.closest(".time-cell");
                if (timeCell) {
                  setupNewSelects(timeCell);
                }
              }
            });
          }
        });
      });
      
      timeCells.forEach(t => {
        const observerOptions = {
          childList: true,
          subtree: true
        };
        observers.observe(t, observerOptions);
      });
  
      load();
  })
  