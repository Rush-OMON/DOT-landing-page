export async function onRequestGet(context) {
  const apiKey = context.env.BUBBLE_API_KEY;
  const url = new URL(context.request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response(renderPage("Verification Failed", "No verification token found.", false), {
      headers: { "Content-Type": "text/html" },
    });
  }

  try {
    const searchRes = await fetch(
      `https://dot-52170.bubbleapps.io/version-test/api/1.1/obj/user?constraints=[{"key":"verification_token","constraint_type":"equals","value":"${token}"}]`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    const searchData = await searchRes.json();
    const users = searchData?.response?.results;

    if (!users || users.length === 0) {
      return new Response(renderPage("Invalid Token", "This link is invalid or has already been used.", false), {
        headers: { "Content-Type": "text/html" },
      });
    }

    const userId = users[0]._id;

    // Step 2: Set email_verified to true
    const updateRes = await fetch(
      `https://dot-52170.bubbleapps.io/version-test/api/1.1/obj/user/${userId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ email_verified: true }),
      }
    );

    if (!updateRes.ok) throw new Error("Failed to update user");

    // Step 3: Clear the verification token
    await fetch(
      `https://dot-52170.bubbleapps.io/version-test/api/1.1/obj/user/${userId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ verification_token: "" }),
      }
    );

    return new Response(renderPage("Email Verified ✓", "Your email has been successfully verified. You can now return to the app.", true), {
      headers: { "Content-Type": "text/html" },
    });

  } catch (err) {
    return new Response(renderPage("Error", "Something went wrong. Please try again.", false), {
      headers: { "Content-Type": "text/html" },
    });
  }
}

function renderPage(title, message, success) {
  const icon = success ? "check_circle" : "error";
  const iconColor = success ? "text-green-600" : "text-red-600";
  
  return `<!DOCTYPE html><html lang="en"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&family=Inter:wght@400;600&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0&display=swap" rel="stylesheet">
    <style>
      body { font-family: 'Inter', sans-serif; background-color: #fff8f3; }
      .sunset-gradient { background: linear-gradient(135deg, #ab3500 0%, #ff6b35 100%); }
    </style>
  </head>
  <body class="antialiased text-on-surface">
    <main class="min-h-screen flex flex-col items-center justify-center px-8 text-center bg-surface">
      <div class="mb-12 w-full max-w-sm flex justify-center">
        <div class="w-32 h-32 bg-white shadow-xl rounded-[2.5rem] flex items-center justify-center">
          <div class="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined ${iconColor} !text-6xl" style="font-variation-settings: 'FILL' 1;">${icon}</span>
          </div>
        </div>
      </div>
      <div class="max-w-md mx-auto">
        <h1 class="font-headline text-4xl font-black mb-4">${title}</h1>
        <p class="text-lg leading-relaxed mb-10 px-4">${message}</p>
        <a href="app-dot-52170://" class="block sunset-gradient text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl w-full">
          Return to App
        </a>
      </div>
    </main>
  </body></html>`;
}
