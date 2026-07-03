export async function onRequestGet(context) {
  // Pulls the secret from your Cloudflare dashboard environment variables
  const apiKey = context.env.BUBBLE_API_KEY;
  const url = new URL(context.request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response(renderPage("Invalid Link", "No verification token found.", false), {
      headers: { "Content-Type": "text/html" },
    });
  }

  try {
    // Step 1: Find user with matching verification token (Updated constraint key)
    const searchRes = await fetch(
      `https://dot-52170.bubbleapps.io/version-test/api/1.1/obj/user?constraints=[{"key":"verification_token","constraint_type":"equals","value":"${token}"}]`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const searchData = await searchRes.json();
    const users = searchData?.response?.results;

    if (!users || users.length === 0) {
      return new Response(renderPage("Invalid Token", "This verification link is invalid or has already been used.", false), {
        headers: { "Content-Type": "text/html" },
      });
    }

    const userId = users[0]._id;

    // Step 2: Set email_verified to true (Updated field name)
    const updateRes = await fetch(
      `https://dot-52170.bubbleapps.io/version-test/api/1.1/obj/user/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_verified: true }),
      }
    );

    if (!updateRes.ok) {
      throw new Error("Failed to update user");
    }

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
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${title}</title>
      <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f5f5f5; }
        .card { background: white; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.1); max-width: 400px; }
        h1 { color: ${success ? "#4CAF50" : "#e53935"}; font-size: 1.5rem; }
        p { color: #666; line-height: 1.6; }
        .icon { font-size: 3rem; margin-bottom: 1rem; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon">${success ? "✅" : "❌"}</div>
        <h1>${title}</h1>
        <p>${message}</p>
      </div>
    </body>
    </html>
  `;
}
