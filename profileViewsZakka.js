const binId = "67d6bee08a456b796676dda9";
const apiKey = "$2a$10$cKE.4UkKYiDWTRAq8mABBeale1HDhPVyt/t1lWax4/AUO4BeNEr92";
const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;

async function updateProfileViews() {
    const viewCountElement = document.getElementById('view-count');

    try {
        let response = await fetch(apiUrl, {
            headers: { "X-Master-Key": apiKey }
        });
        let data = await response.json();
        let views = data.record.views || 0;

        if (!localStorage.getItem('viewCounted')) {
            views += 1;
            localStorage.setItem('viewCounted', true);

            await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": apiKey
                },
                body: JSON.stringify({ views: views })
            });
        }

        viewCountElement.textContent = views;
    } catch (error) {
        console.error("Error updating profile views:", error);
    }
}

updateProfileViews();