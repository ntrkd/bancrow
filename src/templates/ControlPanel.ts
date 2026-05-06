export const ControlPanelJS = () => {
  let newX = 0, newY = 0, startX = 0, startY = 0;

  const card = document.getElementById('control-panel-decor');
  if (!card) { return; }

  card.addEventListener('mousedown', mouseDown);

  function mouseDown(e: MouseEvent){
      e.preventDefault();

      const overlay = document.createElement('div');
      overlay.id = "moving-ctrl-panel-overlay"
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.zIndex = '999999';
      overlay.style.cursor = 'grabbing';
      overlay.style.background = 'transparent';

      document.body.appendChild(overlay);

      startX = e.clientX;
      startY = e.clientY;

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
  }

  function mouseMove(e: MouseEvent){
      newX = startX - e.clientX;
      newY = startY - e.clientY;
    
      startX = e.clientX;
      startY = e.clientY;

      const container = document.getElementById('control-panel-container');
      if (!container) { return; }
      container.style.top = (container.offsetTop - newY) + 'px';
      container.style.left = (container.offsetLeft - newX) + 'px';
  }

  function mouseUp(e: MouseEvent){
      let overlay = document.getElementById("moving-ctrl-panel-overlay");
      overlay?.remove();
      overlay = null;
      document.removeEventListener('mousemove', mouseMove);
  }
}

export const ControlPanelHTML = `<div class="card-container" id="control-panel-container">
  <div class="card-decor" id="control-panel-decor">
    <div class="red-circle"></div>
    <div class="green-circle"></div>
    <div class="yellow-circle"></div>
  </div>
  <div class="card">

    <div class="card-header">
    CONTROL PANEL
    </div>
    <div class="card-body">
      <button class="card-start">
        START
      </button>
      <div class="scraped-counter">
        <div>Page 1/234</div>
        <div>_0%</div>
      </div>
    </div>
  </div>
</div>`

export const ControlPanelCSS = `:root{
    font-family: monospace;
    color: #101F3A;
}

.card-container { 
  position: fixed;
  top: 100px;
  left: 100px;
  z-index: 999;
  width: fit-content;
  display: flex; 
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  box-shadow: -0.1rem 0.8rem 1rem 0.2rem rgba(0, 0, 0, 0.3);
}

.card { 
  min-height: 150px;
  background: #ECA129; 
  padding: 1rem; 
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  /* border-radius: 0.35rem;  */
  text-align: center;
  font-weight: 900;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
}

.card-header {
  min-height: 60%;
  margin-bottom: 1.5rem;
  background-color: #eca129;
}

.card-start {
  background-color: white;
  border: 0;
  outline: var(--border);
  padding: 0.2rem 0.5rem;
  font-weight: 900;
  width: fit-content;
  font-size: 1rem;
  font-family: monospace;
  /* box-shadow: 0px 0.3rem 0.3rem rgba(0, 0, 0, 0.2); */
  transition: all 0.1s;
  cursor: pointer;
  border-bottom: 4px solid #d9d9d9;
}

.card-start:hover {
    /* box-shadow: 0px 15px 25px -5px rgba(0, 0, 0, 0.15); */
  transform: scale(1.03);
}

.card-start:active {
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); */
  transform: scale(0.98);
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scraped-counter {
  margin-top: auto;
  display: flex;
  flex-direction: column;
}

.card-decor {
  height: 1rem;
  background-color: #101F3A;
  width: 100%;
  height: 1.3rem;
  display: flex;
  align-items: center;  
  cursor: grab;
}

.red-circle {
  margin-left: 0.3rem;
  height: 0.5rem;
  width: 0.5rem;
  background-color: #ff5f57;
  border-radius: 50%;
  display: inline-block;
}
.yellow-circle {
  margin-left: 0.3rem;
  height: 0.5rem;
  width: 0.5rem;
  background-color: #febc2e;
  border-radius: 50%;
  display: inline-block;
}
.green-circle {
  margin-left: 0.3rem;
  height: 0.5rem;
  width: 0.5rem;
  background-color: #28c840;
  border-radius: 50%;
  display: inline-block;
}`