class ArrayList {
  static isArray<T>(arrayList: T[] | null | undefined): arrayList is T[] {
    if (arrayList && Array.isArray(arrayList) && arrayList.length > 0) {
      return true;
    }
    return false;
  }
}
export default ArrayList;
