this.favoriteUsers = userData.favoriteUsers;
this.skills = userData.skills.map(skill => new Skill(skill));
this.contacts = userData.contacts?.map(contact => new Contact(contact)) ?? [];
this.imageUrl = userData.imageUrl;
this.isMentor = userData.isMentor; 