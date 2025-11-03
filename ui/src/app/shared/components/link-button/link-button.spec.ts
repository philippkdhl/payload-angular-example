import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LinkButton } from './link-button';

@Component({
  selector: 'test-host-component',
  template: `
    <app-link-button
      [linkText]="linkText"
      [linkUrl]="linkUrl"
      [linkExternal]="linkExternal">
    </app-link-button>
  `,
  standalone: true,
  imports: [LinkButton]
})
class TestHostComponent {
  linkText = 'Test-Link';
  linkUrl = 'https://example.com';
  linkExternal = false;
}

describe('LinkButton (with HostComponent)', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should render the link element with text', () => {
    const link = hostFixture.debugElement.query(By.css('a'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('Test-Link');
  });

  it('should set the href attribute correctly', () => {
    const link = hostFixture.debugElement.query(By.css('a'));
    expect(link.nativeElement.getAttribute('href')).toBe('https://example.com');
  });

  it('should set target to _blank when linkExternal is true', () => {
    hostComponent.linkExternal = true;
    hostFixture.detectChanges();

    const link = hostFixture.debugElement.query(By.css('a'));
    expect(link.nativeElement.getAttribute('target')).toBe('_blank');
  });

  it('should set target to _self when linkExternal is false', () => {
    hostComponent.linkExternal = false;
    hostFixture.detectChanges();

    const link = hostFixture.debugElement.query(By.css('a'));
    expect(link.nativeElement.getAttribute('target')).toBe('_self');
  });

});
