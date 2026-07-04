export async function onRequestGet(context) {
  const apiKey = context.env.BUBBLE_API_KEY;
  const url = new URL(context.request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return Response.redirect("app-dot-52170://", 302);
  }

  try {
    // Step 1: Find user with matching login token
    const searchRes = await fetch(
      `https://dot-52170.bubbleapps.io/version-live/api/1.1/obj/user?constraints=${encodeURIComponent(JSON.stringify([{"key":"login_token_text","constraint_type":"equals","value":token}]))}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const searchData = await searchRes.json();
    const users = searchData?.response?.results;

    if (!users || users.length === 0) {
      return Response.redirect("app-dot-52170://", 302);
    }

    const userId = users[0]._id;

    // Step 2: Clear the login token
    await fetch(
      `https://dot-52170.bubbleapps.io/version-live/api/1.1/obj/user/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login_token_text: "" }),
      }
    );

    // Step 3: Redirect to app with token
    return Response.redirect(`app-dot-52170://login?token=${token}`, 302);

  } catch (err) {
    return Response.redirect("app-dot-52170://", 302);
  }
}
