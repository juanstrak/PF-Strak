import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Alumno } from '../alumnos.component';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  // Subject
  private estudiantes2$ = new Subject<Alumno[]>();

  // BehaviorSubject
  private estudiantes$ = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      nombre: 'Santiago',
      apellido: 'Gonzalez',
      pais: 'Argentina',
      email: 'santigonzalez@mail.com',
      telefono: '1156482233'
    },
    {
      id: 2,
      nombre: 'Pedro',
      apellido: 'Da Silva',
      pais: 'Brasil',
      email: 'pedrodasilva@mail.com',
      telefono: '55692354'
    },
    {
      id: 3,
      nombre: 'Luis',
      apellido: 'Correa',
      pais: 'Uruguay',
      email: 'luchocorrea@mail.com',
      telefono: '22558896'
    },
  ])

  constructor(private httpClient: HttpClient) { }


  getStudentsFromDB(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${enviroment.apiBaseUrl}/students`);
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.estudiantes$.asObservable();
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.estudiantes$.asObservable()
      .pipe(
        map((alumnos) => alumnos.find((a) => a.id === id))
      )
  }
}