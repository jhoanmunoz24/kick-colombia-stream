console.log("✅ Script cargado");
const streamers = ['davooxeneize','westcol','lonche','Spreen','mernuel','laparce','LACOBRAAA','lasapaaaaa','mrstiventc','rdjavi','elzeein']
const containerStreamers = document.getElementById("streamer-container")

async function streamerData(name){
        try{
        const res = await fetch (`https://kick.com/api/v2/channels/${name}`)
       
        

        
        if(!res.ok) throw new Error(`Error con ${name}`)

        const data = await res.json()

        

        

        return data;
    

    }
    catch(error){
        console.error(`❌ Error obteniendo datos de ${name}:`, error);
        return null

    
    }
    
}

async function streamerInfo(){
    for(const name of streamers){
        const result = await streamerData(name)

        if(!result){
            continue
        }

        const data = result;

        const profilePic = data.user.profile_pic
        const followers = data.followers_count.toLocaleString('en');
        
        let twitter,tiktok,youtube;

        if(data?.user?.twitter){
            twitter = `https://x.com/${data?.user?.twitter}` 
        }

        if(data?.user?.tiktok){
            tiktok = `https://www.tiktok.com/@${data?.user?.tiktok}` 
        }

        if(data?.user?.youtube){
            youtube = `https://www.youtube.com/${data?.user?.youtube}` 
        }
        



        

        const card = document.createElement('div')
        card.className = "streamerCard"
        card.setAttribute("data-streamer",name)


        const perfilImage = document.createElement('img')
        perfilImage.className = "streamerImage"
        perfilImage.src = profilePic
        card.appendChild(perfilImage)

        const followerText = document.createElement('h3')
        followerText.className = "streamerFollowers"
        followerText.textContent = `${followers} Seguidores` 
        card.appendChild(followerText)
        



        const viewersContainer = document.createElement('div')
        viewersContainer.style.display = "flex"
        viewersContainer.style.flexDirection = "row-reverse"
        viewersContainer.style.alignItems = "center"
        const viewers = document.createElement('h3')
        viewers.className = "viewersText"
        viewersContainer.appendChild(viewers)
        
        
        const viewerCount = await getViewers(name)
        if(viewerCount > 0){
            const lottieContainer = document.createElement('div')
            viewersContainer.appendChild(lottieContainer)
            lottieContainer.style.width = "50px"
            lottieContainer.style.height = "50px"
            lottieContainer.style.flexShrink = "0"

            lottie.loadAnimation({
                container : lottieContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://lottie.host/fb7d8622-c1cf-49ec-ab12-842a0339649d/GCe3V3almK.json'
            })

            viewers.textContent = `${viewerCount} Viewers`

            

        }
        else{
            viewers.textContent = "❌ El streamer no esta en vivo"
            viewers.style.textAlign = "center"
        }

        
        

        card.appendChild(viewersContainer)

        containerStreamers.appendChild(card)
        


    
        

        





    }
}


async function updateViewers(){
    for(const name of streamers){
        const card = document.querySelector(`[data-streamer="${name}"]`)
        if(!card) continue

        const viewerText = card.querySelector(".viewersText")

        if(!viewerText) continue
        
        const viewerCount = await getViewers(name)

        if(viewerCount > 0 ){
            viewerText.textContent = `${viewerCount} Viewers`
        }
        else{
            viewerText.textContent = "❌ El streamer no esta en vivo"
        }
        
    
    }

    setTimeout(updateViewers,30000)
}


async function getViewers(name){
    
        try{
        const viewers = await fetch (`https://kick.com/api/v2/channels/${name}/livestream`)
            
        const viewsData = await viewers.json()
        console.log("Respuesta viewers para", name, viewsData);

        
        

        return viewsData?.data?.viewers || 0
       

    }
    catch(error){
        return 0
    }
    
    
}







streamerInfo().then(() => {
    setTimeout(updateViewers,30000)
})

