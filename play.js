// let audioUrl = ""; // Store the audio URL in memory

// async function generateSpeech(text, speaker) {
//   try {
//     const apiUrl = "https://api.openai.com/v1/audio/speech";

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer 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`,
//       },
//       body: JSON.stringify({
//         model: "tts-1",
//         input: text,
//         voice: speaker === "Kendrick" ? "Echo" : "Onyx",
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error generating speech: ${response.statusText}`);
//     }

//     const audioData = await response.arrayBuffer();
//     const audioBlob = new Blob([audioData], { type: "audio/mp3" });

//     audioUrl = URL.createObjectURL(audioBlob); // Store it in memory

//     const audioElement = new Audio(audioUrl);
//     audioElement.play();
//     console.log(audioElement);

//     console.log(`${speaker}'s audio generated and played.`);
//   } catch (error) {
//     console.error(`Error generating ${speaker}'s speech:`, error);
//   }
// }

// // Function to extract Kendrick's verses
// function kendrick(txt) {
//   const verses = [];
//   const lines = txt.split("\n");
//   for (let i = 0; i < lines.length; i++) {
//     if (lines[i].startsWith("1:")) {
//       let verse = "";
//       for (let j = i; j < i + 4 && j < lines.length; j++) {
//         verse += lines[j].substring(3) + "\n";
//       }
//       verses.push(verse.trim());
//       i += 3;
//     }
//   }
//   return verses;
// }

// // Function to extract Drake's verses
// function drake(txt) {
//   const verses = [];
//   const lines = txt.split("\n");
//   for (let i = 0; i < lines.length; i++) {
//     if (lines[i].startsWith("2:")) {
//       let verse = "";
//       for (let j = i; j < i + 4 && j < lines.length; j++) {
//         verse += lines[j].substring(3) + "\n";
//       }
//       verses.push(verse.trim());
//       i += 3;
//     }
//   }
//   return verses;
// }

// // Recite the verses
// let currentRound = 0;
// const rounds = 4;
// const kendrickVerses = kendrick(text);
// const drakeVerses = drake(text);

// async function speakNext() {
//   if (currentRound < rounds) {
//     if (currentRound < kendrickVerses.length) {
//       console.log("Kendrick:");
//       console.log(kendrickVerses[currentRound]);
//       await generateSpeech(kendrickVerses[currentRound], "Kendrick"); // Ensure speech is generated sequentially
//     }
//     if (currentRound < drakeVerses.length) {
//       console.log("Drake:");
//       console.log(drakeVerses[currentRound]);
//       await generateSpeech(drakeVerses[currentRound], "Drake"); // Ensure speech is generated sequentially
//     }
//     currentRound++;
//     speakNext(); // Recursively call to continue generating the next round of verses
//   }
// }

// // Start reciting the verses
// window.onload = function () {
//   reciteVerses();
// };

// window.onload = function () {
//   reciteVerses();
//   document.getElementById("subtitlesp").innerHTML =
//     localStorage.getItem("generatedText");
// };

let audioUrl = ""; // Store the audio URL in memory

async function generateSpeech(text, speaker) {
  try {
    const apiUrl = "https://api.openai.com/v1/audio/speech";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: speaker === "Kendrick" ? "echo" : "onyx",
      }),
    });

    if (!response.ok) {
      throw new Error(`Error generating speech: ${response.statusText}`);
    }

    const audioData = await response.arrayBuffer();
    const audioBlob = new Blob([audioData], { type: "audio/mp3" });

    audioUrl = URL.createObjectURL(audioBlob); // Store it in memory

    const audioElement = new Audio(audioUrl);
    audioElement.play();
    console.log(audioElement);

    console.log(`${speaker}'s audio generated and played.`);
  } catch (error) {
    console.error(`Error generating ${speaker}'s speech:`, error);
  }
}

// Function to extract Kendrick's verses
function kendrick(txt) {
  const verses = [];
  const lines = txt.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("1:")) {
      let verse = "";
      for (let j = i; j < i + 4 && j < lines.length; j++) {
        verse += lines[j].substring(3) + "\n";
      }
      verses.push(verse.trim());
      i += 3;
    }
  }
  return verses;
}

// Function to extract Drake's verses
function drake(txt) {
  const verses = [];
  const lines = txt.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("2:")) {
      let verse = "";
      for (let j = i; j < i + 4 && j < lines.length; j++) {
        verse += lines[j].substring(3) + "\n";
      }
      verses.push(verse.trim());
      i += 3;
    }
  }
  return verses;
}

// Recite the verses
function reciteVerses() {
  const text = localStorage.getItem("generatedText");

  if (!text) {
    console.error("No text found in localStorage.");
    return;
  }
  var currentRound = 0;
  const rounds = 4;
  const kendrickVerses = kendrick(text);
  const drakeVerses = drake(text);

  async function speakNext(currentRound) {
    for (let i = 0; i < rounds; i++) {
      if (currentRound < rounds) {
        if (i % 2 == 0) {
          console.log("Kendrick:");
          console.log(kendrickVerses[currentRound]);
          await generateSpeech(kendrickVerses[currentRound], "Kendrick");
          i++;
        } else if (i % 2 != 0) {
          console.log("Drake:");
          console.log(drakeVerses[currentRound]);
          await generateSpeech(drakeVerses[currentRound], "Drake");
          i++;
        }
      }
    }
  }

  speakNext(currentRound);
}

// Store text data in localStorage
function storeTextInLocalStorage() {
  const sampleText = localStorage.getItem("generatedText");

  localStorage.setItem("cleanGeneratedText", sampleText);
}

window.onload = function () {
  storeTextInLocalStorage(); // Store the text before reciting
  reciteVerses();
  document.getElementById("subtitlesp").innerHTML =
    localStorage.getItem("generatedText");
};
