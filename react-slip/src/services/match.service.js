import http from "../http-common";

class MatchDataService{
  getAll() {
    return http.get("/matches/all");
  }

  getPlayers() {
    return http.get("/matches/players");
  }

  getGlobal(){
    return http.get("/matches/global");
  }

  getSheet(){
    return http.get("/matches/sheet")
  }

  create(data) {
    return http.post("/matches", data);
  }

  findByCode(searchParamString){
    console.log(searchParamString);
    return http.get(`matches?${searchParamString}`);
  }
}

export default new MatchDataService();