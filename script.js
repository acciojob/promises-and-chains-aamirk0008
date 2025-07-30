//your JS code here. If required.
const form = document.getElementById("votingForm");
      const nameInput = document.getElementById("name");
      const ageInput = document.getElementById("age");
      const submitBtn = document.getElementById("btn");
      function showCustomAlert(message, type = "info") {
        const existingAlert = document.querySelector(".custom-alert");
        const existingBackdrop = document.querySelector(".alert-backdrop");
        if (existingAlert) existingAlert.remove();
        if (existingBackdrop) existingBackdrop.remove();

        const backdrop = document.createElement("div");
        backdrop.className = "alert-backdrop";
        document.body.appendChild(backdrop);

        const alertDiv = document.createElement("div");
        alertDiv.className = "custom-alert";
        alertDiv.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 15px;">
                    ${
                      type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"
                    }
                </div>
                <div style="font-size: 1.1rem; color: #333; margin-bottom: 20px;">
                    ${message}
                </div>
                <button onclick="closeCustomAlert()" style="
                    padding: 10px 20px;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">OK</button>
            `;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
          backdrop.classList.add("show");
          alertDiv.classList.add("show");
        }, 10);
      }

      window.closeCustomAlert = function () {
        const alert = document.querySelector(".custom-alert");
        const backdrop = document.querySelector(".alert-backdrop");
        if (alert) {
          alert.classList.remove("show");
          backdrop.classList.remove("show");
          setTimeout(() => {
            alert.remove();
            backdrop.remove();
          }, 300);
        }
      };

      function checkVotingEligibility(name, age) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (parseInt(age) >= 18) {
              resolve(`Welcome, ${name}. You can vote.`);
            } else {
              reject(`Oh sorry ${name}. You aren't old enough.`);
            }
          }, 4000); 
        });
      }

      form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const age = ageInput.value.trim();

        if (!name || !age) {
          showCustomAlert("Please enter valid details.", "error");
          return;
        }

        if (parseInt(age) < 1 || parseInt(age) > 120) {
          showCustomAlert(
            "Please enter a valid age between 1 and 120.",
            "error"
          );
          return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add("loading");
        submitBtn.textContent = "Processing...";

        try {
          const result = await checkVotingEligibility(name, age);
          showCustomAlert(result, "success");
        } catch (error) {
          showCustomAlert(error, "error");
        } finally {
          submitBtn.disabled = false;
          submitBtn.classList.remove("loading");
          submitBtn.textContent = "Check Eligibility";
        }
      });

      [nameInput, ageInput].forEach((input) => {
        input.addEventListener("input", function () {
          if (this.value.trim()) {
            this.style.borderColor = "#28a745";
          } else {
            this.style.borderColor = "#e1e5e9";
          }
        });
      });

      [nameInput, ageInput].forEach((input) => {
        input.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            form.dispatchEvent(new Event("submit"));
          }
        });
      });