export class Inspection {
  constructor(data = {}) {
    this.id = data.id ?? Date.now()
    this.adres = data.adres ?? data.location ?? data.title ?? ''
    this.inspecteur = data.inspecteur ?? data.inspector ?? ''
    this.datum = data.datum ?? data.inspectionDate ?? ''
    this.title = data.title ?? this.adres
    this.location = data.location ?? this.adres
    this.inspectionDate = data.inspectionDate ?? this.datum
    this.inspector = data.inspector ?? this.inspecteur
    this.status = data.status ?? 'open'
    this.score = data.score ?? null
    this.schade = data.schade ?? {}
    this.onderhoud = data.onderhoud ?? {}
    this.installatie = data.installatie ?? {}
    this.modificatie = data.modificatie ?? {}
  }
}