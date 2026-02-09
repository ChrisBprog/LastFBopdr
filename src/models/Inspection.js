export class Inspection {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.location = data.location
    this.inspectionDate = data.inspectionDate
    this.inspector = data.inspector
    this.status = data.status
    this.score = data.score
  }
}
