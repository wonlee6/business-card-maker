class Corona {
  constructor(key) {
    this.key = key;
  }
  async getCoronaItems() {
    const response = await fetch(
      `https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=10&serviceKey=${this.key}`
    );
    const result = await response.json();
    return result;
  }
}

export default Corona;
