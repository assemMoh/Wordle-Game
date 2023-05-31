// console.log("Button clicked!");
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

///paths///
/// drwaing the stand and the rope

const button = document.getElementsByClassName("button")[0];
const counter = document.getElementById("counter");
// let count = 0;

// button.addEventListener("click", function () {
  // Code to execute when the button is clicked

function draw(count) 
{
    // count++;
    if (count === 1) {
      ctx.beginPath();
      ctx.moveTo(20, 50);
      ctx.lineTo(200, 50);
      ctx.moveTo(60, 50);
      ctx.lineTo(60, 220);
      ctx.moveTo(30, 220);
      ctx.lineTo(90, 220);
      ctx.moveTo(180, 50);
      ctx.lineTo(180, 80);
      ctx.stroke();
      // counter.textContent = count;
    }
    
    if (count == 2) {
      ctx.beginPath();
      ctx.arc(180, 100, 20, 0, Math.PI * 2, true);
      // Draw Head
      ctx.moveTo(170, 90);
      ctx.stroke();
      // counter.textContent = count;
    // }
    
    
    // if (count == 3)
    // {
      ctx.lineTo(170, 95);
      //Left eye
      ctx.moveTo(190, 90);
      ctx.lineTo(190, 95);
      // right eye
      ctx.moveTo(190, 110);
      ctx.arc(180, 110, 10, 0, Math.PI, true); // Draw Mouth
      ctx.stroke();
      // counter.textContent = count;

    }


    if (count == 3) {
      ctx.beginPath();
      ctx.moveTo(180, 120);
      ctx.lineTo(180, 180);
      ctx.stroke();
      //drwaing the height of the man
      // counter.textContent = count;
    }

    if (count == 4) {
      ctx.moveTo(180, 130);
      ctx.lineTo(150, 150);
      //left-hand
      ctx.stroke();
      // counter.textContent = count;
    // }

    // if (count == 5) {
      ctx.moveTo(180, 130);
      ctx.lineTo(210, 150);
      //right-hand
      ctx.stroke();
      // counter.textContent = count;
    }

    if (count == 5) {
      ctx.moveTo(180, 180);
      ctx.lineTo(150, 210);
      //left - leg;
      ctx.stroke();
      // counter.textContent = count;
    // }

    // if (count == 7) {
      ctx.moveTo(180, 180);
      ctx.lineTo(210, 210);
      //right - leg;
      ctx.stroke();
      // counter.textContent = count;
    }

    if (count == 6) {
      let headY = 100; // Initial Y position of the head
      let headVelocity = 2; // Velocity of the head

      let lineY = 100; // Initial Y position of the line
      let lineVelocity = 2; // Velocity of the line

      let lefthandY = 80; // Initial Y position of the line
      let vlefthand = 2; // Velocity of the line

      let righthandY = 120; // Initial Y position of the line
      let vrighthand = 2; // Velocity of the line

      let leftlegY = 80; // Initial Y position of the line
      let vleftleg = 2; // Velocity of the line

      let rightlegY = 120; // Initial Y position of the line
      let vrightleg = 2; // Velocity of the line

      function animate() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update the position of the head
        headY += headVelocity;
        lineY += lineVelocity;
        lefthandY += vlefthand;
        righthandY += vrighthand;
        leftlegY += vleftleg;
        rightlegY += vrightleg;
        // Draw the hangman
        // ...

        // Draw the head at the updated position
        ctx.beginPath();
        ctx.arc(180, headY, 20, 0, Math.PI * 2);
        //circle(head)
        ctx.moveTo(160, lineY);
        ctx.lineTo(80, lineY);
        //line(height)
        ctx.moveTo(150, lineY);
        ctx.lineTo(120, lefthandY);
        //line(left-hand)
        ctx.moveTo(150, lineY);
        ctx.lineTo(120, righthandY);
        //line(right-hand)

        ctx.moveTo(80, lineY);
        ctx.lineTo(50, leftlegY);
        //leg-1

        ctx.moveTo(80, lineY);
        ctx.lineTo(50, rightlegY);
        //leg-2
        ctx.stroke();

        // Check if the head has reached the bottom of the canvas
        if (headY + 20 >= canvas.height) {
          // Stop the animation
          return;
        }

        // Call the animation recursively
        requestAnimationFrame(animate);
      }

      // Start the animation
      animate();
    }
}
// });

export { draw } 