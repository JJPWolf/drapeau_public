import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JeuPage } from './jeu.page';

describe('JeuPage', () => {
  let component: JeuPage;
  let fixture: ComponentFixture<JeuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JeuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
